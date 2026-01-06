// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/admission/form`
  | `/portal/createuser`
  | `/portal/lecturer`
  | `/portal/lecturer/calendar`
  | `/portal/lecturer/lms`
  | `/portal/lecturer/lms/analytics`
  | `/portal/lecturer/lms/announcements`
  | `/portal/lecturer/lms/assignments`
  | `/portal/lecturer/lms/attendance`
  | `/portal/lecturer/lms/course/:id`
  | `/portal/lecturer/lms/course/:id/announcements`
  | `/portal/lecturer/lms/course/:id/assignments`
  | `/portal/lecturer/lms/course/:id/assignments/:assignmentId`
  | `/portal/lecturer/lms/course/:id/assignments/:assignmentId/edit`
  | `/portal/lecturer/lms/course/:id/assignments/new`
  | `/portal/lecturer/lms/course/:id/students`
  | `/portal/lecturer/lms/grades`
  | `/portal/lecturer/students`
  | `/portal/login`
  | `/portal/student`
  | `/portal/student/course-registration`
  | `/portal/student/lms`
  | `/portal/student/lms/announcements`
  | `/portal/student/lms/assignments`
  | `/portal/student/lms/course/:id`
  | `/portal/student/lms/course/:id/assignments/:assignmentId`
  | `/portal/student/lms/grades`

export type Params = {
  '/portal/lecturer/lms/course/:id': { id: string }
  '/portal/lecturer/lms/course/:id/announcements': { id: string }
  '/portal/lecturer/lms/course/:id/assignments': { id: string }
  '/portal/lecturer/lms/course/:id/assignments/:assignmentId': { id: string; assignmentId: string }
  '/portal/lecturer/lms/course/:id/assignments/:assignmentId/edit': { id: string; assignmentId: string }
  '/portal/lecturer/lms/course/:id/assignments/new': { id: string }
  '/portal/lecturer/lms/course/:id/students': { id: string }
  '/portal/student/lms/course/:id': { id: string }
  '/portal/student/lms/course/:id/assignments/:assignmentId': { id: string; assignmentId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
