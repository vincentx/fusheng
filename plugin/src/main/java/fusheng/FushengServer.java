package fusheng;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

import fusheng.config.ServerConfig;
import fusheng.outbound.Runner;
import fusheng.repository.ExperimentRepository;
import fusheng.repository.ReportRepository;
import fusheng.repository.SpecRepository;
import org.apache.log4j.Logger;

public class FushengServer {
    private static final Logger log = Logger.getLogger(FushengServer.class);
    private HttpServer currentActiveServer;
    private final ServerConfig serverConfig = new ServerConfig();
    private final Runner runner = new Runner();
    private final SpecRepository specRepository  = new SpecRepository(serverConfig);
    private final ReportRepository reportRepository = new ReportRepository(serverConfig);
    private final ExperimentRepository experimentRepository = new ExperimentRepository(serverConfig);
    private final SpecService specService = new SpecService(runner);

    public HttpServer startServer() throws IOException {
        final var requestQueue = 0;
        final var port = 26868;
        final var httpServer = HttpServer.create(new InetSocketAddress("localhost", port), requestQueue);
        httpServer.createContext("/fusheng", new FushengHttpHandler(specRepository, reportRepository, experimentRepository, specService));
        httpServer.setExecutor(Executors.newFixedThreadPool(10));
        httpServer.start();
        setCurrentActiveServer(httpServer);
        log.info("living doc started at port: {}" + port);
        return httpServer;
    }

    public void stopServer() {
        final var delayInSecond = 3;
        final var currentActiveServer = getCurrentActiveServer();
        currentActiveServer.stop(delayInSecond);
        log.info("living doc server stopped!");
    }

    public HttpServer getCurrentActiveServer() {
        return currentActiveServer;
    }

    public void setCurrentActiveServer(final HttpServer currentActiveServer) {
        this.currentActiveServer = currentActiveServer;
    }
}
