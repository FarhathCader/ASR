from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_text(text: str) -> str:
    if not text or len(text.strip()) == 0:
        return "No text to summarize."
    try:
        summary = summarizer(text, max_length=150, min_length=40, do_sample=False)[0]['summary_text']
        formatted_summary = f"Subjective/Objective/Assessment/Plan Summary:\n{summary}"
        return formatted_summary
    except Exception as e:
        return f"Summarization failed: {str(e)}"
