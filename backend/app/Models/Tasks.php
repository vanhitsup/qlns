<?php

namespace App\Models;

use App\Models\Priority;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tasks extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $fillable = [
        'name',
        'priorityId',
        'taskTypeId',
        'taskStatusId',
        'projectId',
        'assigneeId',
        'teamId',
        'milestoneId',
        'startDate',
        'endDate',
        'description',
        'type',
    ];

    public function priority()
    {
        return $this->belongsTo(Priority::class, 'priorityId');
    }

   

    public function taskStatus()
    {
        return $this->belongsTo(TaskStatus::class, 'taskStatusId');
    }


    public function project()
    {
        return $this->belongsTo(Project::class, 'projectId');
    }

    public function assignee()
    {
        return $this->belongsTo(Users::class, 'assigneeId');
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contactId');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'companyId');
    }

    public function milestone()
    {
        return $this->belongsTo(Milestone::class, 'milestoneId');
    }

    public function assignedTask()
    {
        return $this->hasMany(AssignedTask::class, 'taskId');
    }

    public function team()
    {
        return $this->belongsTo(ProjectTeam::class, 'teamId');
    }
   

}
