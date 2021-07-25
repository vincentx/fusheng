package fusheng;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("classpath:application-test.properties")
class ReportControllerTest {
    @Autowired
    private MockMvc mvc;

    @Test
    void should_return_spec_content_if_report_exist() throws Exception {

        final var reportPath = "test";

        mvc.perform(
                MockMvcRequestBuilders
                        .get("/v1/fusheng/reports/" + reportPath)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_HTML_VALUE));
    }

    @Test
    void should_return_all_report_paths_as_list_when_retrieve_reports_given_all_report_already_been_generated() throws Exception {
        mvc.perform(
                MockMvcRequestBuilders
                        .get("/v1/fusheng/reports")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(equalTo(4))))
                .andExpect(jsonPath("$[0]", is("selectWinner")))
                .andExpect(jsonPath("$[1]", is("firstRoundBet")));
    }



}
