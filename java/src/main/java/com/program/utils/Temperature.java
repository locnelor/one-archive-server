package com.program.utils;

public class Temperature {
    public static double[] arr = {0, 0};
    public static int point = 0;
    public static boolean record(String str){
        double num;
        try{
            num = Double.parseDouble(str);
        }catch(NumberFormatException e){
            return false;
        }
        return record(num);
    }
    public static String parse(String str){
        try{
            double num = Double.parseDouble(str);
            if(num > 37 || num < 36){
                return random();
            }
            if(!record(num))return random();
            return num + "";
        }catch(NumberFormatException e){
            return random();
        }
    }
    public static boolean record(double num) {
        if(point != 2){
            arr[point] = num;
            point ++;
            return true;
        }
        if(arr[0] == arr[1] && arr[1] == num){
            return false;
        }
        point = 1;
        arr[0] = num;
        return true;
    }
    public static String random() {
        double r = 36 + Math.floor(Math.random() * 10) / 10;
        if(!record(r))return random();
        return r + "";
    }
}