package com.thoughtworks.fusheng.integration.junit5.discovery;

import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengEngineDescriptor;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengFixtureDescriptor;
import org.junit.platform.commons.util.ClassFilter;
import org.junit.platform.engine.EngineDiscoveryRequest;
import org.junit.platform.engine.TestDescriptor;
import org.junit.platform.engine.UniqueId;
import org.junit.platform.engine.support.discovery.EngineDiscoveryRequestResolver;

public class FuShengDiscoverySelectorResolver {
    private static final IsPotentialFuShengTestClass isPotentialFuShengTestClass = new IsPotentialFuShengTestClass();

    private static final EngineDiscoveryRequestResolver<TestDescriptor> resolver = EngineDiscoveryRequestResolver.builder()
                                                                                                                 .addClassContainerSelectorResolver(isPotentialFuShengTestClass)
                                                                                                                 .addSelectorResolver(context -> new FixtureSelectorResolver(ClassFilter.of(context.getClassNameFilter(), isPotentialFuShengTestClass)))
                                                                                                                 .build();

    public TestDescriptor resolve(EngineDiscoveryRequest discoveryRequest, UniqueId uniqueId) {
        FuShengEngineDescriptor engineDescriptor = new FuShengEngineDescriptor(uniqueId);
        resolver.resolve(discoveryRequest, engineDescriptor);
        FuShengFixtureDescriptorPostProcessor postProcessor = new FuShengFixtureDescriptorPostProcessor();
        engineDescriptor.getChildren().stream()
                        .filter(FuShengFixtureDescriptor.class::isInstance)
                        .map(FuShengFixtureDescriptor.class::cast)
                        .forEach(postProcessor::createDescendants);
        return engineDescriptor;
    }
}
