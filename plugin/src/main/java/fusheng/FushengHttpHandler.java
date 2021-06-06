package fusheng;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

public class FushengHttpHandler implements HttpHandler {
    @Override
    public void handle(final HttpExchange httpExchange) throws IOException {
        String response = null;
        final var allowList = List.of("spec", "resource");
        final var url = httpExchange.getRequestURI().toString();

        if (allowList.stream().noneMatch(url::contains)) {
            throw new IOException("not supported API!");
        }

        if ("GET".equals(httpExchange.getRequestMethod())) {
            response = handleGetRequest(httpExchange);
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
        return "updated spec file";
    }

    private String handleGetRequest(final HttpExchange httpExchange) {
        if (httpExchange.getRequestURI().toString().contains("spec")) {
            return "new generated spec";
        } else {
            return "all resources, contain css and javascript";
        }
    }

}
