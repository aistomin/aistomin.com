---
layout: default
title: Blog
---

<div class="page-header">
    <h1 class="page-title">My Blog</h1>
</div>

<div class="page-content">
    
    <div class="blog-posts">
        {% for post in site.posts %}
        <article class="blog-post">
            <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
            <div class="post-meta">
                <time datetime="{{ post.date | date_to_xmlschema }}">
                    {{ post.date | date: "%B %d, %Y" }}
                </time>
                {% if post.categories.size > 0 %}
                <span class="categories">
                    {% for category in post.categories %}
                        <span class="category">{{ category }}</span>
                    {% endfor %}
                </span>
                {% endif %}
            </div>
            <div class="post-excerpt">
                {% if post.excerpt %}
                    {{ post.excerpt }}
                {% else %}
                    {{ post.content | strip_html | truncatewords: 50 }}
                {% endif %}
            </div>
            <a href="{{ post.url | relative_url }}" class="read-more">Read more</a>
        </article>
        {% endfor %}
    </div>
</div>
