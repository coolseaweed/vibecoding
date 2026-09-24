"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/chat";

const adjectives = ["씩씩한", "다정한", "즐거운", "빛나는", "차분한"];
const animals = ["해달", "수달", "고양이", "참새", "여우"];

function createNickname() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adjective} ${animal}`;
}

function MessageText({ text }: { text: string }) {
  return text.split(/(https?:\/\/\S+)/g).map((part, index) =>
    part.startsWith("http://") || part.startsWith("https://") ? (
      <a key={`${part}-${index}`} href={part} target="_blank" rel="noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [nickname, setNickname] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);
  const latestMessageId = messages[messages.length - 1]?.id;

  const loadMessages = useCallback(async () => {
    const response = await fetch("/api/chat", { cache: "no-store" });
    const data = (await response.json()) as { messages?: ChatMessage[]; error?: string };

    if (!response.ok) {
      throw new Error(data.error || "메시지를 불러오지 못했어요.");
    }

    setMessages(data.messages || []);
    setError("");
  }, []);

  useEffect(() => {
    const savedNickname = sessionStorage.getItem("chat-nickname") || createNickname();
    sessionStorage.setItem("chat-nickname", savedNickname);
    const nicknameUpdate = window.setTimeout(() => setNickname(savedNickname), 0);

    const initialLoad = window.setTimeout(() => {
      void loadMessages().catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : "메시지를 불러오지 못했어요.");
      });
    }, 0);

    const interval = window.setInterval(() => {
      void loadMessages().catch(() => undefined);
    }, 2_000);

    return () => {
      window.clearTimeout(nicknameUpdate);
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
    };
  }, [loadMessages]);

  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [latestMessageId]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, text }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "메시지를 보내지 못했어요.");
      }

      setText("");
      await loadMessages();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "메시지를 보내지 못했어요.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-card">
      <div className="chat-meta">
        <span className="chat-status"><i aria-hidden="true" /> 2초마다 새 메시지 확인</span>
        <span>내 이름: <strong>{nickname || "연결 중…"}</strong></span>
      </div>

      <div className="chat-messages" ref={messageListRef} aria-live="polite" aria-label="채팅 메시지">
        {messages.length === 0 ? (
          <p className="chat-empty">아직 메시지가 없어요. 첫 인사를 남겨보세요.</p>
        ) : (
          messages.map((message) => (
            <article className="chat-message" key={message.id}>
              <header>
                <strong>{message.nickname}</strong>
                <time dateTime={new Date(message.createdAt).toISOString()}>
                  {new Date(message.createdAt).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                </time>
              </header>
              <p><MessageText text={message.text} /></p>
            </article>
          ))
        )}
      </div>

      <form className="chat-form" onSubmit={sendMessage}>
        <label htmlFor="chat-message">메시지</label>
        <div>
          <input
            id="chat-message"
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxLength={500}
            placeholder="정보나 링크를 공유해 보세요"
            autoComplete="off"
          />
          <button type="submit" disabled={sending || !nickname || !text.trim()}>
            {sending ? "전송 중" : "보내기"}
          </button>
        </div>
        <p className="chat-help">로그인 없이 참여합니다. 메시지는 최대 24시간 유지되며 서버가 쉬면 더 일찍 사라질 수 있어요.</p>
        {error && <p className="chat-error" role="alert">{error}</p>}
      </form>
    </div>
  );
}
