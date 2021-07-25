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
class ExperimentControllerTest {
    @Autowired
    private MockMvc mvc;


    @Test
    void should_return_expected_experiment_html_content_when_retrieve_particular_file() throws Exception {

        final var experimentPath = "firstRoundBet-202107130912";

        mvc.perform(
                MockMvcRequestBuilders
                        .get("/v1/fusheng/spec/experiments/" + experimentPath)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_HTML_VALUE));
    }

    @Test
    void should_return_all_experiment_paths_as_list_when_retrieve_reports_given_all_report_already_been_generated() throws Exception {
        final String specName = "selectWinner";
        mvc.perform(
                MockMvcRequestBuilders
                        .get("/v1/fusheng/spec/{pathName}/experiments", specName)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(equalTo(2))))
                .andExpect(jsonPath("$[0]", is("selectWinner-202107121313")))
                .andExpect(jsonPath("$[1]", is("selectWinner-202107121310")));
    }


}
