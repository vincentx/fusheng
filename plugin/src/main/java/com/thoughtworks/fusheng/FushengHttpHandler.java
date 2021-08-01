package com.thoughtworks.fusheng;

import static java.util.stream.Collectors.joining;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.thoughtworks.fusheng.repository.ExperimentRepository;
import com.thoughtworks.fusheng.repository.IndexRepository;
import com.thoughtworks.fusheng.repository.ReportRepository;
import com.thoughtworks.fusheng.repository.SpecRepository;
import com.thoughtworks.fusheng.util.FushengLogger;
import java.util.Arrays;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.web.util.UriTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
public class FushengHttpHandler implements HttpHandler {
    private static final Logger log = Logger.getLogger(FushengHttpHandler.class);
    private final SpecRepository specRepository;
    private final ReportRepository reportRepository;
    private final ExperimentRepository experimentRepository;
    private final IndexRepository indexRepository;

    @Override
    public void handle(final HttpExchange httpExchange) throws IOException {

        final var allowList = List.of("spec", "experiment", "reports", "specs", "test", "index");
        final var url = httpExchange.getRequestURI().toString();

        if (allowList.stream().noneMatch(url::contains)) {
            FushengLogger.info(String.format("the URL:%s not allowed!", httpExchange.getRequestURI()), getClass());
            throw new IOException("not supported API!");
        }
        String message = String.format("start to handle request -> %s:%s",
                httpExchange.getRequestMethod(),
                httpExchange.getRequestURI());

        FushengLogger.info(message, getClass());

        String response = handleRequestByType(httpExchange);
        if (Objects.isNull(response)) {
            response = "Ops something went wrong!";
        }

        handleResponse(httpExchange, Objects.requireNonNull(response));
        FushengLogger.info("request handling finished for URL:" + httpExchange.getRequestURI(), getClass());
    }

    private String handleRequestByType(HttpExchange httpExchange) {
        try {
            if ("GET".equals(httpExchange.getRequestMethod())) {
                return String.join(", ", handleGetRequest(httpExchange));
            } else if ("POST".equals(httpExchange.getRequestMethod())) {
                return handlePostRequest(httpExchange);
            }
        } catch (Exception exp) {
            FushengLogger.error(exp.getMessage(), exp, getClass());
        }
        return "Unexpected issue occurred!";
    }

    private void handleResponse(final HttpExchange httpExchange, final String response) {
        try {
            byte[] bs = response.getBytes(StandardCharsets.UTF_8);
            httpExchange.sendResponseHeaders(200, bs.length);
            OutputStream os = httpExchange.getResponseBody();
            os.write(bs);
            os.flush();
            httpExchange.close();
        } catch (Exception e) {
            log.error(e);
        }
    }

    private String handlePostRequest(final HttpExchange httpExchange) {
        String experimentWithName = "/experiment/{pathName}";
        if (isValidUri(httpExchange, experimentWithName)) {
            Map<String, String> pathVariables = getPathVariable(httpExchange, experimentWithName);
            InputStream requestBodyInputStream = httpExchange.getRequestBody();
            String htmlContent;
            try {
                htmlContent = IOUtils.toString(requestBodyInputStream);
            } catch (IOException exp) {
                FushengLogger.error(exp.getMessage(), exp, getClass());
                throw new IllegalArgumentException(exp);
            }

            return experimentRepository.runExperiment(pathVariables.get("pathName"), htmlContent);
        }

        return "Unexpected Response";
    }

    private List<String> handleGetRequest(final HttpExchange httpExchange) {
        String specsWithName = "/specs/{pathName}";
        if (isValidUri(httpExchange, specsWithName)) {
            Map<String, String> pathVariables = getPathVariable(httpExchange, specsWithName);
            return List.of(specRepository.retrieveSpec(pathVariables.get("pathName")));
        }

        String spec = "/spec/test";
        if (isValidUri(httpExchange, spec)) {

            final String classPathPackages =
                    Arrays.stream(ClassLoader.getSystemClassLoader().getDefinedPackages()).map(Package::getName).collect(joining(","));
            FushengLogger.info(classPathPackages, getClass());
            return List.of("test");
        }

        String reportsWithName = "/reports/{pathName}";
        if (isValidUri(httpExchange, reportsWithName)) {
            Map<String, String> pathVariables = getPathVariable(httpExchange, reportsWithName);
            return List.of(reportRepository.retrieve(pathVariables.get("pathName")));
        }

        String reports = "/reports";
        if (isValidUri(httpExchange, reports)) {
            return reportRepository.retrieveAll();
        }

        String specExperimentsWithName = "/spec/{pathName}/experiments";
        if (isValidUri(httpExchange, specExperimentsWithName)) {
            Map<String, String> pathVariables = getPathVariable(httpExchange, specExperimentsWithName);
            return experimentRepository.retrieveExperimentHistoryForSpec(pathVariables.get("pathName"));
        }

        String experimentWithName = "/spec/experiments/{pathName}";
        if (isValidUri(httpExchange, experimentWithName)) {
            Map<String, String> pathVariables = getPathVariable(httpExchange, experimentWithName);
            return List.of(experimentRepository.retrieveSingleExperimentResult(pathVariables.get("pathName")));
        }

        String indexHtml = "/index";
        if (isValidUri(httpExchange, indexHtml)) {
            return List.of(indexRepository.retrieveIndexHtml());
        }

        return List.of("nothing matched, please check your url.");
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
