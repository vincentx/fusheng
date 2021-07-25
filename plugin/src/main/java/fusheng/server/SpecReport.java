package fusheng.server;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SpecReport {
    private final long id;
    private final String description;
}
