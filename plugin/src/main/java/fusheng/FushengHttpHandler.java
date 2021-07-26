package fusheng;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import fusheng.repository.ExperimentRepository;
import fusheng.repository.ReportRepository;
import fusheng.repository.SpecRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.util.UriTemplate;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
public class FushengHttpHandler implements HttpHandler {
    private final SpecRepository specRepository;
    private final ReportRepository reportRepository;
    private final ExperimentRepository experimentRepository;
    private final SpecService specService;

    @Override
    public void handle(final HttpExchange httpExchange) throws IOException {
        String response = null;
        final var allowList = List.of("spec", "experiment", "reports", "specs", "test");
        final var url = httpExchange.getRequestURI().toString();

        if (allowList.stream().noneMatch(url::contains)) {
            throw new IOException("not supported API!");
        }

        if ("GET".equals(httpExchange.getRequestMethod())) {
            response = String.join(", ", handleGetRequest(httpExchange));
        } else if ("POST".equals(httpExchange.getRequestMethod())) {
            response = handlePostRequest(httpExchange);
        }

        handleResponse(httpExchange, Objects.requireNonNull(response));
    }

    private void handleResponse(final HttpExchange httpExchange, final String response) throws IOException {
        final var outputStream = httpExchange.getResponseBody();
        httpExchange.sendResponseHeaders(200, response.length());
        outputStream.write(response.getBytes(StandardCharsets.UTF_8));
        outputStream.flush();
        outputStream.close();
    }

    private String handlePostRequest(final HttpExchange httpExchange) {
        if (httpExchange.getRequestURI().toString().equals("/experiment/{pathName}")) {
            String pathName = "";
            String htmlContent = httpExchange.getRequestBody().toString();
            return specService.runExperiment(pathName, htmlContent);
        } else {
            return "all resources, contain css and javascript";
        }
    }

    private List<String> handleGetRequest(final HttpExchange httpExchange) {
        String specsWithName = "/specs/{pathName}";
        if (isValidUri(httpExchange, specsWithName)){
            Map<String, String> pathVariables = getPathVariable(httpExchange, specsWithName);
            return List.of(specRepository.retrieveSpec(pathVariables.get("pathName")));
        }

        String spec = "/spec/test";
        if (isValidUri(httpExchange, spec)){
            return List.of("test");
        }

        String reportsWithName = "/reports/{pathName}";
        if (isValidUri(httpExchange, reportsWithName)){
            Map<String, String> pathVariables = getPathVariable(httpExchange, reportsWithName);
            return List.of(reportRepository.retrieve(pathVariables.get("pathName")));
        }

        String reports = "/reports";
        if (isValidUri(httpExchange, reports)){
            return reportRepository.retrieveAll();
        }

        String specExperimentsWithName = "/spec/{pathName}/experiments";
        if (isValidUri(httpExchange, specExperimentsWithName)){
            Map<String, String> pathVariables = getPathVariable(httpExchange, specExperimentsWithName);
            return experimentRepository.retrieveExperimentHistoryForSpec(pathVariables.get("pathName"));
        }

        String experimentWithName = "/spec/experiments/{experimentPathName}";
        if (isValidUri(httpExchange, experimentWithName)){
            Map<String, String> pathVariables = getPathVariable(httpExchange, experimentWithName);
            return List.of(experimentRepository.retrieveSingleExperimentResult(pathVariables.get("pathName")));
        }

        return List.of("all resources, contain css and javascript");
    }

    private Map<String, String> getPathVariable(final HttpExchange httpExchange, String templateUri) {
        UriTemplate template = new UriTemplate(templateUri);
        return template.match(httpExchange.getRequestURI().toString());
    }

    private Boolean isValidUri(final HttpExchange httpExchange, String templateUri) {
        String flag = "/fusheng";
        int prefixURIIndex = httpExchange.getRequestURI().toString().indexOf(flag);
        String prefixURI = httpExchange.getRequestURI().toString().substring(0, prefixURIIndex);
        UriTemplate template = new UriTemplate(prefixURI + flag + templateUri);
        return template.matches(httpExchange.getRequestURI().toString());
    }
}
