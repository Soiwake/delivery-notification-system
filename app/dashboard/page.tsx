"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Filter, Eye, Plus, CheckCircle, Clock, Mail, AlertCircle, User, Calendar } from "lucide-react"

interface NotificationRecord {
  id: string
  recipient: string
  sendDate: string
  readStatus: "read" | "unread"
  replyStatus: "replied" | "no-reply"
  readDate?: string
  replyDate?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample data
  const notifications: NotificationRecord[] = [
    {
      id: "001",
      recipient: "田中 太郎",
      sendDate: "2024-01-15 14:30",
      readStatus: "read",
      replyStatus: "replied",
      readDate: "2024-01-15 15:45",
      replyDate: "2024-01-15 16:20",
    },
    {
      id: "002",
      recipient: "佐藤 花子",
      sendDate: "2024-01-15 13:15",
      readStatus: "read",
      replyStatus: "no-reply",
      readDate: "2024-01-15 14:00",
    },
    {
      id: "003",
      recipient: "山田 次郎",
      sendDate: "2024-01-15 12:00",
      readStatus: "unread",
      replyStatus: "no-reply",
    },
    {
      id: "004",
      recipient: "鈴木 美咲",
      sendDate: "2024-01-14 16:45",
      readStatus: "read",
      replyStatus: "replied",
      readDate: "2024-01-14 17:30",
      replyDate: "2024-01-14 18:15",
    },
  ]

  const getStatusBadge = (readStatus: string, replyStatus: string) => {
    if (readStatus === "unread") {
      return (
        <Badge variant="secondary">
          <Clock className="w-3 h-3 mr-1" />
          未読
        </Badge>
      )
    }
    if (replyStatus === "replied") {
      return (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle className="w-3 h-3 mr-1" />
          返信済み
        </Badge>
      )
    }
    return (
      <Badge variant="outline">
        <Mail className="w-3 h-3 mr-1" />
        既読
      </Badge>
    )
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.recipient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      statusFilter === "all" ||
      (statusFilter === "unread" && notification.readStatus === "unread") ||
      (statusFilter === "read" && notification.readStatus === "read") ||
      (statusFilter === "replied" && notification.replyStatus === "replied")

    return matchesSearch && matchesFilter
  })

  const stats = {
    total: notifications.length,
    read: notifications.filter((n) => n.readStatus === "read").length,
    unread: notifications.filter((n) => n.readStatus === "unread").length,
    replied: notifications.filter((n) => n.replyStatus === "replied").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">配達通知ダッシュボード</h1>
            <p className="text-gray-600">送信した通知の状況を確認できます</p>
          </div>
          <Button onClick={() => router.push("/")} className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            新しい伝票を処理
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">総送信数</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">既読</p>
                  <p className="text-2xl font-bold">{stats.read}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">未読</p>
                  <p className="text-2xl font-bold">{stats.unread}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">返信済み</p>
                  <p className="text-2xl font-bold">{stats.replied}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              検索・フィルター
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="受取人名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="ステータスで絞り込み" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="unread">未読</SelectItem>
                  <SelectItem value="read">既読</SelectItem>
                  <SelectItem value="replied">返信済み</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Table */}
        <Card>
          <CardHeader>
            <CardTitle>通知一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>受取人</TableHead>
                    <TableHead>送信日時</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>既読日時</TableHead>
                    <TableHead>返信日時</TableHead>
                    <TableHead>詳細</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-mono">{notification.id}</TableCell>
                      <TableCell className="font-medium">{notification.recipient}</TableCell>
                      <TableCell>{notification.sendDate}</TableCell>
                      <TableCell>{getStatusBadge(notification.readStatus, notification.replyStatus)}</TableCell>
                      <TableCell>{notification.readDate || "-"}</TableCell>
                      <TableCell>{notification.replyDate || "-"}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>通知詳細</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="font-medium">受取人:</span>
                                <span className="ml-2">{notification.recipient}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="font-medium">送信日時:</span>
                                <span className="ml-2">{notification.sendDate}</span>
                              </div>
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="font-medium">ステータス:</span>
                                <span className="ml-2">
                                  {getStatusBadge(notification.readStatus, notification.replyStatus)}
                                </span>
                              </div>
                              {notification.readDate && (
                                <div className="flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-2 text-gray-500" />
                                  <span className="font-medium">既読日時:</span>
                                  <span className="ml-2">{notification.readDate}</span>
                                </div>
                              )}
                              {notification.replyDate && (
                                <div className="flex items-center">
                                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                  <span className="font-medium">返信日時:</span>
                                  <span className="ml-2">{notification.replyDate}</span>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">該当する通知が見つかりません</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
