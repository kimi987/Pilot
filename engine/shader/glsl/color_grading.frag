#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

void main()
{
    highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    highp float _COLORS      = float(lut_tex_size.y);

    highp vec4 color       = subpassLoad(in_color).rgba;
    highp float ceilVal = 1.0 / 16.0;
    
    highp float index1 = floor(color.b * 16.0);
    highp float index2 = ceil(color.b * 16.0);

    highp vec2 uv1 = vec2(index1 * ceilVal + color.r * ceilVal, color.g);
    highp vec2 uv2 = vec2(index2* ceilVal + color.r * ceilVal, color.g);

    highp float lerpVal = (color.b - index2 * ceilVal) * 16.0;

    highp vec4 color1 = texture(color_grading_lut_texture_sampler, uv1);
    highp vec4 color2 = texture(color_grading_lut_texture_sampler, uv2);

    color = (1.0 - lerpVal) * color1  + lerpVal * color2;
    
    out_color = color;

}
