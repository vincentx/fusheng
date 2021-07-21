package com.thoughtworks.fusheng.exception;

public class FixtureInitFailedException extends RunnerBaseException {

    public FixtureInitFailedException(String message, Throwable e) {
        super(message, e);
    }
}
