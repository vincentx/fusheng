package fusheng.server;

import fusheng.server.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/fusheng")
public class ReportController {
    private final ReportRepository reportRepository;

    @GetMapping(value = "/reports/{pathName}", produces = MediaType.TEXT_HTML_VALUE)
    public String retrieveReport(@PathVariable String pathName) {
        return reportRepository.retrieve(pathName);
    }


    @GetMapping(value = "/reports", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> retrieveReports() {
        return reportRepository.retrieveAll();
    }

}
