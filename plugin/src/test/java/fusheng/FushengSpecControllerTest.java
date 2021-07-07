package fusheng;

import com.sun.net.httpserver.HttpServer;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static org.junit.Assert.assertEquals;

public class FushengSpecControllerTest {

    private HttpServer currentActiveServer;

    @Before
    public void setUp() throws Exception {
        var httpServer = new FushengServer();
        currentActiveServer = httpServer.startServer();
    }

    @After
    public void tearDown() {
        currentActiveServer.stop(3);
    }

    @Test
    public void should_return_body_given_path_name_exists() throws IOException, InterruptedException {
        // given
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:26868/fusheng/specs"))
                .build();

        // when
        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        //then
        assertEquals("all resources, contain css and javascript", response.body());
    }
}
