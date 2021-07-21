package com.thoughtworks.fusheng.integration.junit5.descriptor;

import lombok.Getter;
import org.junit.platform.engine.TestSource;
import org.junit.platform.engine.UniqueId;

@Getter
public class FuShengExampleDescriptor extends FuShengTestDescriptor {
    private final String exampleName;

    public FuShengExampleDescriptor(UniqueId uniqueId, String displayName, String exampleName, TestSource source) {
        super(uniqueId, displayName, source);
        this.exampleName = exampleName;
    }
}
