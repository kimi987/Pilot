#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(location = 0) in highp vec2 in_texcoord;

layout(location = 0) out highp vec4 out_color;

void main()
{
    highp vec4 color       = subpassLoad(in_color).rgba;
    
    highp float grey = dot(color.rgb, vec3(0.22, 0.707, 0.071)) ;

    out_color = vec4(grey,grey,grey,grey);

}
