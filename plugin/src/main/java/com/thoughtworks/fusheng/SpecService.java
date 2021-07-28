package com.thoughtworks.fusheng;

import com.thoughtworks.fusheng.outbound.Runner;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SpecService {
    private final Runner runner;

    public String runExperiment(String pathName, String htmlContent) {
        // TODO: 2021/7/13 integrate with Runner
        return runner.runExperiment(pathName, htmlContent);
    }
}
