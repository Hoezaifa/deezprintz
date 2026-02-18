'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
// import { useChat } from '@ai-sdk/react';

// Helper to extract text from message parts or content
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMessageText = (message: any) => {
    if (typeof message.content === 'string') return message.content;
    if (message.parts) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return message.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('');
    }
    return '';
};

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { id: Date.now().toString(), role: 'user', content: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to send message');
            }

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' };
            setMessages(prev => [...prev, botMessage]);
            setIsLoading(false); // Stop loading spinner as soon as stream starts

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                botMessage.content += chunk;
                setMessages(prev => prev.map(m => m.id === botMessage.id ? { ...m, content: botMessage.content } : m));
            }
        } catch (err) {
            console.error('Failed to send message:', err);
            setError(err instanceof Error ? err : new Error('Something went wrong'));
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-background border border-border/50 rounded-xl shadow-xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border/50 bg-primary/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Bot className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Deez AI Assistant</h3>
                                    <p className="text-xs text-muted-foreground">Ask me anything!</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 hover:bg-primary/10"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.length === 0 && (
                                    <div className="text-center text-muted-foreground py-8">
                                        <Bot className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p className="text-sm">
                                            Hi! I&apos;m your personal shopping assistant.
                                            <br />
                                            Ask me about our products, sizing, or anything else!
                                        </p>
                                    </div>
                                )}
                                {error && (
                                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4">
                                        <p className="font-semibold">Error</p>
                                        <p>{error.message || 'Something went wrong. Please try again.'}</p>
                                    </div>
                                )}
                                {messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className={cn(
                                            "flex gap-3 text-sm",
                                            m.role === 'user' ? "flex-row-reverse" : "flex-row"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                                m.role === 'user'
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted text-muted-foreground"
                                            )}
                                        >
                                            {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div
                                            className={cn(
                                                "rounded-lg px-3 py-2 max-w-[80%]",
                                                m.role === 'user'
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted"
                                            )}
                                        >
                                            {getMessageText(m)}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                            <Bot className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <div className="bg-muted rounded-lg px-3 py-2">
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>

                        {/* Input */}
                        <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
                            <form
                                onSubmit={handleSubmit}
                                className="flex gap-2"
                            >
                                <Input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-background/50"
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-lg bg-[#f6861f] hover:bg-[#d97316] text-white transition-transform hover:scale-105"
                >
                    {isOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <MessageCircle className="w-6 h-6" />
                    )}
                </Button>
            )}
        </div>
    );
}
