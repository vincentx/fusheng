package com.thoughtworks.fusheng;

public class FushengMain {
    public static void main(String[] args) {
        final var server = new FushengServer();
        try {
            server.startServer();
            Thread.sleep(60000);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            server.stopServer();
        }
    }
}
