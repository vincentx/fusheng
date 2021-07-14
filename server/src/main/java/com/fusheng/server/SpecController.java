package com.fusheng.server;

import com.fusheng.server.repository.SpecRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SpecController {
    private final SpecRepository specRepository;

    private final SpecService specService;

    @GetMapping("/test")
    public List<SpecReport> retrieveSpec() {
        return List.of(
                SpecReport.builder()
                        .id(1)
                        .description("first spec")
                        .build(),
                SpecReport.builder()
                        .id(2)
                        .description("second spec")
                        .build());

    }

    @GetMapping(value = "/specs/{pathName}", produces = MediaType.TEXT_HTML_VALUE)
    public String retrieveSpec(@PathVariable String pathName) {
        return specRepository.retrieveSpec(pathName);
    }

    @GetMapping("/experiments")
    public List<String> retrieveAllExperiments(){
        return specService.findAllExperiments();
    }

    @GetMapping("/reports")
    public List<String> retrieveAllReports() {
        return specService.findAllReports();
    }

    @GetMapping("/experiment/{pathName}")
    public String retrieveExperimentByPathName(@PathVariable String pathName){
        return specService.findExperimentByPathName(pathName);
    }

    @PostMapping("/experiment/{pathName}")
    public String runExperiment(@PathVariable String pathName, @RequestBody String htmlContent){
        return specService.runExperiment(pathName, htmlContent);
    }
}
