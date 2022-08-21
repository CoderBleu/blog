package com.blog.business.fiter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.io.PrintWriter;

/**
 * 统一鉴权
 * 验证用户是否携带token
 */
@Component
public class AccessFilter extends ZuulFilter {

    private static final Logger logger = LoggerFactory.getLogger(AccessFilter.class);

    /**
     * 网管过滤器类型
     * pre routing post error
     *
     * @return
     */
    @Override
    public String filterType() {
        return "pre";
    }

    /**
     * 执行顺序，数值越小，优先级越高
     *
     * @return
     */
    @Override
    public int filterOrder() {
        return 1;
    }

    /**
     * 执行条件
     *
     * @return
     */
    @Override
    public boolean shouldFilter() {
        return true;
    }

    /**
     * 动作（具体逻辑）
     *
     * @return
     * @throws ZuulException
     */
    @Override
    public Object run() throws ZuulException {
        //todo 模拟异常
        //Integer.parseInt("zuul");
        //获取请求上下文
        RequestContext rc = RequestContext.getCurrentContext();
        HttpServletRequest request = rc.getRequest();
        //todo 获取表单中的token,后续在head中获取
        String token = request.getParameter("token");
        //业务逻辑
        if (token == null) {
            logger.warn("token is null...");
            //请求结束，不在继续向下请求
            rc.setSendZuulResponse(false);
            //响应状态码：401 用户没有访问权限
            rc.setResponseStatusCode(HttpStatus.UNAUTHORIZED.value());
            //相应类型
            rc.getResponse().setContentType("application/json;charset=utf-8");
            PrintWriter writer = null;
            try {
                writer = rc.getResponse().getWriter();
                //响应内容
                writer.print("{\"message\":\"" + HttpStatus.UNAUTHORIZED.getReasonPhrase() + "\"}");
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (writer != null) {
                    writer.close();
                }
            }
        } else {
            logger.warn("token is ok...");
        }
        return null;
    }
}
