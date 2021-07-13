package com.fusheng.server;

import com.fusheng.server.outbound.Runner;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SpecServiceTest {

    @Mock
    Runner runner;

    @InjectMocks
    SpecService service;

    @Test
    void should_return_experiment_result_when_run_experiment_given_pathName_and_content() {
        String pathName = "path name";
        String content = "content";
        String experimentResult = "result";
        when(runner.runExperiment(pathName, content)).thenReturn(experimentResult);

        String result = service.runExperiment(pathName, content);
        assertEquals(result, experimentResult);
    }
}
