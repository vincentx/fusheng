package com.thoughtworks.fusheng.exception;

public class ReaderException extends RunnerBaseException {

    public ReaderException(String message) {
        super(message);
    }

    public ReaderException(String message, Throwable e) {
        super(message, e);
    }
}
