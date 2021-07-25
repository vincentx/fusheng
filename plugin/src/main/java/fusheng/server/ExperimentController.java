package fusheng.server;

import fusheng.server.repository.ExperimentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/fusheng")
public class ExperimentController {
    private final ExperimentRepository experimentRepository;

    private final SpecService specService;

    @PostMapping("/experiment/{pathName}")
    public String runExperiment(@PathVariable String pathName, @RequestBody String htmlContent) {
        return specService.runExperiment(pathName, htmlContent);
    }

    @GetMapping("/spec/{pathName}/experiments")
    public List<String> retrieveExperimentHistoryForSpec(@PathVariable String pathName) {
        return experimentRepository.retrieveExperimentHistoryForSpec(pathName);
    }

    @GetMapping(value = "/spec/experiments/{experimentPathName}", produces = MediaType.TEXT_HTML_VALUE)
    public String retrieveSingleExperimentResult(@PathVariable String experimentPathName) {
        return experimentRepository.retrieveSingleExperimentResult(experimentPathName);
    }


}
