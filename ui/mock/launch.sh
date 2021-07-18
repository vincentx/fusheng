#!/usr/bin/env bash

if ! [ -e wiremock-standalone.jar ]; then
    echo WireMock standalone JAR missing. Downloading.
    curl https://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/2.27.2/wiremock-standalone-2.27.2.jar -o wiremock-standalone.jar
    status=$?
    if [ ${status} -ne 0 ]; then
        echo curl could not download WireMock JAR 1>&2
        exit ${status}
    fi
fi

java -jar wiremock-standalone.jar --port 8081 --verbose --global-response-templating
