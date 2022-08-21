# blog
这是一个博客🍎

服务端说明：
blog-server-admin     父级
blog-server-api       封装公共依赖，工具包，配置类
blog-server-eureka    注册中心   9300（如果改成集群，端口以9310，9320格式）   http://localhost:9300/
blog-server-config    配置中心
blog-server-zuul      网关(统一外部调用地址) 隐藏真实端口  http://localhost:9400/consume-service/consumer
blog-server-provider  提供端    9110    http://localhost:9110/provider
blog-server-consume   消费端   9210    http://localhost:9210/consumer


版本：springcloud: Greenwich.SR1   spring.boot: 2.1.x. 以上
服务熔断级制，服务负载均衡
