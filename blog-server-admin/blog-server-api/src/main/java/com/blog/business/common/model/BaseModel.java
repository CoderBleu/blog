package com.blog.business.common.model;

import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;

public class BaseModel<T extends BaseModel<?>> extends Model {

    @Override
    protected Serializable pkVal() {
        return super.pkVal();
    }

}
