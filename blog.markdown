---
layout: default
title: 'Blog — Essays About Everything and Nothing'
description: "Writing on what I'm building, studying, and thinking about. Notes and essays on work, hobbies, side projects, and other pursuits."
image: /assets/images/blog-og.jpg
---

<div class="page-header">
    <h1 class="page-title">Essays About Everything and Nothing</h1>
</div>

<div class="page-content">
    <img src="/assets/images/blog.jpg" alt="Andrej Istomin" class="blog-photo" onerror="this.style.display='none'">
    <p class="blog-description">
    This is where I put longer pieces and shorter notes: What I’m building, what I’m studying, and what I’m thinking about. The topics include work, hobbies, side projects, and whatever else holds my attention. There’s no single theme and no fixed schedule — just writing when something feels worth saying.
    </p>
    <div class="blog-posts">
        {% for post in site.posts %}
        <article class="blog-post">
            <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
            <div class="post-meta">
                <time datetime="{{ post.date | date_to_xmlschema }}">
                    {{ post.date | date: "%B %-d, %Y" }}
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
