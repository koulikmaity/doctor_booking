package com.km.doctorbooking.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtils {

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // 📌 Convert String → LocalDate
    public static LocalDate parseDate(String date) {
        return LocalDate.parse(date, FORMATTER);
    }

    // 📌 Convert LocalDate → String
    public static String formatDate(LocalDate date) {
        return date.format(FORMATTER);
    }

    // 📌 Check if date is in past
    public static boolean isPastDate(String date) {
        LocalDate inputDate = parseDate(date);
        return inputDate.isBefore(LocalDate.now());
    }
}