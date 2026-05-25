"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, ArrowLeft, Phone, MoreVertical, Image as ImageIcon,
  Smile, Check, CheckCheck, Search, Trash2, Flag, Ban
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';

const conversations = [
  {
    id: '1',
    user: {
      name: 'Ali Electronics',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      isOnline: true,
      lastSeen: 'Online'
    },
    lastMessage: 'Yes, the iPhone is still available',
    time: '2 min ago',
    unread: 2,
    product: {
      title: 'iPhone 15 Pro Max',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100',
      price: 485000
    }
  },
  {
    id: '2',
    user: {
      name: 'Tech Store PK',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      isOnline: false,
      lastSeen: '1 hour ago'
    },
    lastMessage: 'Let me check the stock',
    time: '1 hour ago',
    unread: 0,
    product: {
      title: 'MacBook Pro M3',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100',
      price: 650000
    }
  },
  {
    id: '3',
    user: {
      name: 'Fatima Khan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      isOnline: true,
      lastSeen: 'Online'
    },
    lastMessage: 'Can you deliver to Karachi?',
    time: '3 hours ago',
    unread: 0,
    product: null
  },
];

const demoMessages = [
  { id: '1', text: 'Hi, is this iPhone still available?', sender: 'me', time: '10:30 AM', status: 'read' },
  { id: '2', text: 'Yes, it is! Are you interested?', sender: 'other', time: '10:32 AM' },
  { id: '3', text: 'Yes, what is the final price?', sender: 'me', time: '10:33 AM', status: 'read' },
  { id: '4', text: 'I can do Rs 480,000 for you. It comes with full box and warranty.', sender: 'other', time: '10:35 AM' },
  { id: '5', text: 'Can you do Rs 470,000?', sender: 'me', time: '10:36 AM', status: 'read' },
  { id: '6', text: 'Let me think about it...', sender: 'other', time: '10:38 AM' },
  { id: '7', text: 'Okay, Rs 475,000 final. Deal?', sender: 'other', time: '10:40 AM' },
  { id: '8', text: 'Deal! When can we meet?', sender: 'me', time: '10:41 AM', status: 'delivered' },
];

const quickReplies = [
  'Is this still available?',
  'What is the final price?',
  'Can you deliver?',
  'Where can we meet?',
  'Thank you!'
];

export default function ChatPage() {
  const params = useParams();
  const [selectedChat, setSelectedChat] = useState<string | null>(params.id as string || null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(demoMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userProfile } = useAuth();

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate typing indicator
    setTimeout(() => setIsTyping(true), 1000);
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! I will get back to you soon.',
        sender: 'other',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 3000);
  };

  const handleQuickReply = (text: string) => {
    setMessage(text);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Conversations List */}
      <div className={`w-full md:w-80 lg:w-96 border-r flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <motion.button
              key={conv.id}
              onClick={() => setSelectedChat(conv.id)}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              className={`w-full p-4 flex items-start gap-3 border-b transition-colors text-left ${
                selectedChat === conv.id ? 'bg-muted' : ''
              }`}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conv.user.avatar} />
                  <AvatarFallback>{conv.user.name[0]}</AvatarFallback>
                </Avatar>
                {conv.user.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{conv.user.name}</span>
                  <span className="text-xs text-muted-foreground">{conv.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                {conv.product && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded overflow-hidden relative">
                      <Image src={conv.product.image} alt="" fill className="object-cover" />
                    </div>
                    <span className="text-xs text-muted-foreground truncate">{conv.product.title}</span>
                  </div>
                )}
              </div>
              {conv.unread > 0 && (
                <Badge className="bg-primary text-primary-foreground">{conv.unread}</Badge>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedChat(null)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src={selectedConversation?.user.avatar} />
                <AvatarFallback>{selectedConversation?.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{selectedConversation?.user.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation?.user.isOnline ? (
                    <span className="text-green-500">Online</span>
                  ) : (
                    `Last seen ${selectedConversation?.user.lastSeen}`
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Search Messages</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Flag className="w-4 h-4 mr-2" />
                    Report User
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    <Ban className="w-4 h-4 mr-2" />
                    Block User
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Product Card (if linked) */}
          {selectedConversation?.product && (
            <div className="p-3 border-b bg-muted/50">
              <Link href={`/product/${selectedChat}`} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                  <Image src={selectedConversation.product.image} alt="" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-sm">{selectedConversation.product.title}</p>
                  <p className="text-primary font-bold">{formatPrice(selectedConversation.product.price)}</p>
                </div>
              </Link>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.sender === 'me' ? 'order-2' : ''}`}>
                    <div className={`px-4 py-2 rounded-2xl ${
                      msg.sender === 'me' 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-muted rounded-bl-none'
                    }`}>
                      <p>{msg.text}</p>
                    </div>
                    <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                      msg.sender === 'me' ? 'justify-end' : ''
                    }`}>
                      <span>{msg.time}</span>
                      {msg.sender === 'me' && msg.status && (
                        msg.status === 'read' ? (
                          <CheckCheck className="w-3 h-3 text-blue-500" />
                        ) : (
                          <Check className="w-3 h-3" />
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm">typing...</span>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t overflow-x-auto">
            <div className="flex gap-2">
              {quickReplies.map((reply, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowEmoji(!showEmoji)}>
                <Smile className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!message.trim()}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
