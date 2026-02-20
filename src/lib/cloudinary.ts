export function getCloudinaryUrl(path: string) {
    // If it's already a full URL, return it
    if (path.startsWith("http")) return path;

    // Remove leading slash if present
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    // Cloudinary Base URL
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
        console.warn("Cloudinary Cloud Name not found in environment variables");
        return path;
    }

    // Construct URL
    // Format: https://res.cloudinary.com/<cloud_name>/image/upload/q_auto,f_auto/deez-prints/<path>
    // Assuming the folder structure in Cloudinary matches "deez-prints/assets/..." and locally we use "/assets/..."

    // Prevent Cloudinary from rasterizing SVGs by stripping format/quality conversions for them
    const transforms = cleanPath.toLowerCase().endsWith(".svg") ? "" : "q_auto,f_auto/";

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}deez-prints/${cleanPath}`;
}
