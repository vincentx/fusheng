package com.fusheng.server;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SpecController {
    @GetMapping("/spec/reports")
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
}
