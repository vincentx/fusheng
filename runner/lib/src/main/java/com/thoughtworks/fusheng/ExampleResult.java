package com.thoughtworks.fusheng;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExampleResult {

    private final boolean isSuccess;
    private final String message;
}
