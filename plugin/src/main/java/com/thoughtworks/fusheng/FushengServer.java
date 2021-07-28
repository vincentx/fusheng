package com.thoughtworks.fusheng;

import com.sun.net.httpserver.HttpServer;
import com.thoughtworks.fusheng.config.ServerConfig;
import com.thoughtworks.fusheng.repository.ExperimentRepository;
import com.thoughtworks.fusheng.repository.IndexRepository;
import com.thoughtworks.fusheng.repository.ReportRepository;
import com.thoughtworks.fusheng.repository.SpecRepository;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

public class FushengServer {
    private static final Logger log = Logger.getLogger(FushengServer.class);
    private HttpServer currentActiveServer;
    private final ServerConfig serverConfig = new ServerConfig();
    private final SpecRepository specRepository = new SpecRepository(serverConfig);
    private final ReportRepository reportRepository = new ReportRepository(serverConfig);
    private final ExperimentRepository experimentRepository = new ExperimentRepository(serverConfig);
    private final IndexRepository indexRepository = new IndexRepository(serverConfig);

    public HttpServer startServer() throws IOException {
        final var requestQueue = 0;
        final var port = 26868;
        final var httpServer = HttpServer.create(new InetSocketAddress("localhost", port), requestQueue);
        httpServer.createContext("/com/thoughtworks/fusheng", new FushengHttpHandler(specRepository, reportRepository, experimentRepository, indexRepository));
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
