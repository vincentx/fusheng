package fusheng;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;
import org.apache.log4j.Logger;

public class FushengServer {
    private static final Logger log = Logger.getLogger(FushengServer.class);

    public void startServer() throws IOException {
        final var requestQueue = 0;
        final var port = 278178;
        final var httpServer = HttpServer.create(new InetSocketAddress("localhost", port), requestQueue);
        httpServer.createContext("root", new FushengHttpHandler());
        httpServer.setExecutor(Executors.newFixedThreadPool(10));
        httpServer.start();
        log.info("living doc started at port: {}" + port);
    }
}
