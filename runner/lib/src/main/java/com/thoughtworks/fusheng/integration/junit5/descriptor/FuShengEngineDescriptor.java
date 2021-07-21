package com.thoughtworks.fusheng.integration.junit5.descriptor;

import org.junit.platform.engine.UniqueId;
import org.junit.platform.engine.support.descriptor.EngineDescriptor;

public class FuShengEngineDescriptor extends EngineDescriptor {
    public FuShengEngineDescriptor(UniqueId uniqueId) {
        super(uniqueId, FuShengTestDescriptor.ENGINE_ID);
    }
}
