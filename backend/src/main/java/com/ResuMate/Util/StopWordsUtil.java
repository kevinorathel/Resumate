package com.ResuMate.Util;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class StopWordsUtil {

    private static final Set<String> STOP_WORDS = new HashSet<>(Arrays.asList(
            "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
            "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both",
            "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "don't", "down",
            "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "haven't",
            "having", "here", "here's", "hereafter", "hereby", "herein", "hereupon", "how", "how's", "however",
            "i", "i'm", "i've", "i'll", "i'd", "i'm", "if", "in", "is", "isn't", "it", "it's", "itself", "let",
            "me", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought",
            "our", "ours", "ourselves", "out", "over", "own", "same", "so", "than", "that", "that's", "that'll",
            "that'd", "that's", "the", "theirs", "themselves", "then", "there", "there's", "thereafter", "thereby",
            "therefore", "therein", "thereupon", "these", "they", "they're", "they've", "they'll", "they'd",
            "they're", "this", "this's", "those", "through", "to", "too", "under", "until", "up", "very",
            "was", "wasn't", "we", "we're", "we've", "we'll", "we'd", "we're", "we", "weren't", "what", "what's",
            "whatsoever", "when", "when's", "where", "where's", "whereas", "wherein", "whereupon", "which",
            "which's", "while", "while's", "who", "who's", "whoever", "whom", "whom's", "whose", "whose's", "why",
            "why's", "with", "within", "without", "you", "you're", "you've", "you'll", "you'd", "you're",
            "you", "your", "yours", "yourself", "yourselves"
    ));

    public static String filterStopWords(String inputText) {
        List<String> words = Arrays.asList(inputText.split("\\s+"));

        return words.stream()
                .filter(word -> !STOP_WORDS.contains(word.toLowerCase()))
                .collect(Collectors.joining(" "));
    }

}
