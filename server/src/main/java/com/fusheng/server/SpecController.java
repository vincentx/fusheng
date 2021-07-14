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
}
