package com.blog.business.fiter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.PrintWriter;

/**
 * 异常过滤器
 * 异常统一处理
 */
@Component
public class ErrorFilter extends ZuulFilter {

    private static final Logger logger = LoggerFactory.getLogger(ErrorFilter.class);


    @Override
    public String filterType() {
        return "error";
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() throws ZuulException {
        //获取请求上下文
        RequestContext rc = RequestContext.getCurrentContext();
        Throwable throwable = rc.getThrowable();
        logger.error("ErrorFilter..." + throwable.getCause().getMessage(), throwable);
        //响应状态码：500 服务器错误
        rc.setResponseStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        //相应类型
        rc.getResponse().setContentType("application/json;charset=utf-8");
        rc.getResponse().setContentType("application/json;charset=utf-8");
        PrintWriter writer = null;
        try {
            writer = rc.getResponse().getWriter();
            //响应内容
            writer.print("{\"message\":\"" + HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase() + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                writer.close();
            }
        }
        return null;
    }
}
