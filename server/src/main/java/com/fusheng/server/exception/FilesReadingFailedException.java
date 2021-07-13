package com.fusheng.server.exception;

public class FilesReadingFailedException extends RuntimeException {

    public FilesReadingFailedException(String message) {
        super(message);
    }
}
