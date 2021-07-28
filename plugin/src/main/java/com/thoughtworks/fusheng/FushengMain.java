package com.thoughtworks.fusheng;

public class FushengMain {
    public static void main(String[] args) {
        final var server = new FushengServer();
        try {
            server.startServer();
            // TODO: is there better way to keep server running?
            while (true){

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            server.stopServer();
        }
    }
}
