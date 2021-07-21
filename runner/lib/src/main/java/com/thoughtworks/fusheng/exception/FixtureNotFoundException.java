package com.thoughtworks.fusheng.exception;

public class FixtureNotFoundException extends RunnerBaseException {

    public FixtureNotFoundException(String message, Throwable e) {
        super(message, e);
    }
}
