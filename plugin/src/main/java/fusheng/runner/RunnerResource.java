package fusheng.runner;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class RunnerResource {
    final List<ExampleResource> exampleResources;
}
