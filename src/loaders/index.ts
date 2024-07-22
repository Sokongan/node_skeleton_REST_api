import expressLoader from "./express";
import type { Express } from 'express';

export default async function ({app}:{app : Express}) {
    await expressLoader({app});
}