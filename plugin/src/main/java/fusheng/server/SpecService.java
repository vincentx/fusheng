package fusheng.server;

import fusheng.server.outbound.Runner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SpecService {
    private final Runner runner;

    public String runExperiment(String pathName, String htmlContent) {
        // TODO: 2021/7/13 integrate with Runner
        return runner.runExperiment(pathName, htmlContent);
    }
}
