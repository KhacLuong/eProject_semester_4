package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.repositories.CoachRepository;
import com.t2104e.biztrip.services.interfaces.ICoachService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Transactional
public class CoachImplService implements ICoachService {
    @Autowired
    private CoachRepository coachRepository;
    @Override
    public Page<CoachEntity> getListCoach(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
        return coachRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
    }

    @Override
    public CoachEntity getOneCoachById(long id) {
        return coachRepository.getCoachEntitiesById(id);
    }

    @Override
    public void deleteCoach(CoachEntity coach) {
        coachRepository.delete(coach);
    }

    @Override
    public void saveCoach(CoachEntity coach) {
        coachRepository.save(coach);
    }
}
