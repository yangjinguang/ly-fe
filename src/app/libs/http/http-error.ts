export interface HttpError {
    error: string;
    exception: string;
    message: string;
    path: string;
    status: number;
    timestamp: Date;
}
