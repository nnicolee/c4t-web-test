import { ImageLoader, ImageLoaderProps } from "next/image";
import { buildUrl } from 'cloudinary-build-url';
import config from "../config";

export const cloudinaryLoader : ImageLoader = ({ src, width, quality } : ImageLoaderProps) : string => {
    return `${config.cloudinary.url}/image/upload/w_${width},q_${
        quality || 75
    },fl_sanitize/web-assets/${src}`;
};

export const cloudinaryTransformLoader = ({ transformations } : {transformations: string[]}) : ImageLoader => {
    let transformProperties = "";

    transformations.forEach((transform) => {
        transformProperties += `,${transform}`;
    });

    return ({ src, width, quality } : ImageLoaderProps) => {
        return `${config.cloudinary.url}/image/upload/w_${width},q_${
            quality || 75
        },fl_sanitize${transformProperties}/web-assets/${src}`;
    }
};

/**
 * 
 * @param path to image on cloudinary mahitm/
 * @param transformations for image
 * @returns Default Cloudinary URL
 */
export const getCloudinaryURL = (path:string, transformations?: object) => {
    return buildUrl(`web-assets/${path}`,{
        cloud: {
            cloudName: config.cloudinary.cloudName
        },
        transformations: {
            ...(transformations || {})
        }
    })
}