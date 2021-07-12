package com.fusheng.server;

import com.fusheng.server.entity.RawSpec;
import com.fusheng.server.repository.SpecRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SpecController {
    private final SpecRepository specRepository;

    private final SpecService specService;

    @GetMapping("/test")
    public List<SpecReport> retrieveAllReport() {
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

    @GetMapping("/specs/{pathName}")
    public RawSpec retrieveAllReport(@PathVariable String pathName) {
        return specRepository.retrieveSpec(pathName);
    }

    @GetMapping("/experiments")
    public List<String> retrieveAllExperiments(){
        return specService.findAllExperiments();
    }
}
